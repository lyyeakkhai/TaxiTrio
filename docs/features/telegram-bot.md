# Feature: Telegram Bot (Driver Notifications)

> Roles: Driver (receive + respond) · Backend (send + handle callbacks)

---

## Overview

When admin assigns a driver to a booking, the backend sends a Telegram message to that driver's linked Telegram account. The message includes booking details and two inline buttons: **Accept** and **Reject**. Tapping a button updates the booking status — no need to open the TaxiTrio app.

---

## Flow

```
Customer books
  → Admin assigns driver in TaxiTrio
  → Backend sends Telegram message to driver's chat_id
      ┌─────────────────────────────────────┐
      │ 🚖 New Booking Assigned             │
      │ Route: Phnom Penh → Siem Reap       │
      │ Date: 12 June 2026 at 08:00         │
      │ Passengers: 2                       │
      │ Notes: Early morning pickup         │
      │                                     │
      │  [✅ Accept]    [❌ Reject]          │
      └─────────────────────────────────────┘
  → Driver taps Accept
  → Telegram sends callback_query to webhook
  → Backend updates booking status → ACCEPTED
  → Customer receives notification
```

---

## Driver Linking Flow

Drivers must link their Telegram account once before they can receive notifications.

```
1. Driver opens TaxiTrio app → Profile → "Link Telegram"
2. App generates a one-time 6-digit code (stored in DB with expiry)
3. Driver messages the bot: /link 482910
4. Bot looks up the code → finds the driver → saves telegram_chat_id
5. Bot replies: "✅ Telegram linked to your TaxiTrio account"
```

---

## Frontend

**Driver page:** `app/(driver)/profile/page.tsx`

- "Link Telegram" button — calls `POST /api/driver/telegram/generate-code`
- Displays the 6-digit code and a deep link: `https://t.me/<botname>?start=482910`
- Shows linked status once `telegram_chat_id` is set on the driver record

---

## Backend

**Bot file:** `bot/index.ts` — grammY bot instance, registered as webhook on Express  
**Notify helper:** `bot/notify.ts` — `notifyDriver(driverId, booking)` called from booking controller  
**Route file:** `routes/driver.ts` (new endpoints below)  
**Webhook route:** `POST /api/telegram/webhook` — receives all Telegram updates

### Library

```bash
npm install grammy
```

### Bot Setup (webhook mode)

```ts
// bot/index.ts
import { Bot, webhookCallback } from 'grammy'
export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!)
export const handleUpdate = webhookCallback(bot, 'express')
```

```ts
// Register in Express app
app.post('/api/telegram/webhook', handleUpdate)
```

### Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/driver/telegram/generate-code` | Driver | Generate one-time link code |
| POST | `/api/telegram/webhook` | — (Telegram) | Receive bot updates |

### Callback Data Format

Buttons are encoded as `action:bookingId`:

```
accept:550e8400-e29b-41d4-a716-446655440000
reject:550e8400-e29b-41d4-a716-446655440000
```

### notify.ts

```ts
export async function notifyDriver(chatId: string, booking: Booking) {
  await bot.api.sendMessage(chatId, formatBookingMessage(booking), {
    reply_markup: {
      inline_keyboard: [[
        { text: '✅ Accept', callback_data: `accept:${booking.id}` },
        { text: '❌ Reject', callback_data: `reject:${booking.id}` },
      ]],
    },
  })
}
```

### Callback Handler

```ts
bot.on('callback_query:data', async (ctx) => {
  const [action, bookingId] = ctx.callbackQuery.data.split(':')
  const chatId = String(ctx.from.id)

  // verify driver owns this booking, then update status
  if (action === 'accept') await updateBookingStatus(bookingId, chatId, 'ACCEPTED')
  if (action === 'reject') await updateBookingStatus(bookingId, chatId, 'REJECTED')

  await ctx.answerCallbackQuery()
  await ctx.editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } })
})
```

---

## Database

### drivers table — new column

| Column | Type | Notes |
|---|---|---|
| telegram_chat_id | VARCHAR(50) | nullable — set after linking |

### New table: `telegram_link_codes`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| driver_id | UUID FK → drivers | |
| code | VARCHAR(10) UNIQUE | 6-digit one-time code |
| expires_at | TIMESTAMP | 10 minutes from generation |
| used | BOOLEAN | default false |

---

## Environment Variables

```env
# backend/.env
TELEGRAM_BOT_TOKEN="123456:ABC-DEF..."
TELEGRAM_WEBHOOK_URL="https://yourdomain.com/api/telegram/webhook"
```

Register the webhook once on deploy:
```bash
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=<WEBHOOK_URL>"
```

For local development, use [ngrok](https://ngrok.com) to expose localhost and set the webhook to the ngrok URL.
