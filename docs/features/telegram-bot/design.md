# Telegram Bot — Design

## Flow

```
Admin assigns driver to booking
  → notifyDriver(driver.telegram_chat_id, booking) called
  → Bot sends message with inline keyboard to driver

Driver taps [Accept] or [Reject]
  → Telegram sends callback_query to POST /api/telegram/webhook
  → Backend updates booking status
  → Customer notified
```

## Driver Linking Flow

```
1. Driver opens TaxiTrio app → Profile → "Link Telegram"
2. App calls POST /api/driver/telegram/generate-code
3. Backend creates 6-digit code in telegram_link_codes (expires 10 min)
4. Driver messages bot: /link 482910
5. Bot looks up code → saves telegram_chat_id on driver record
6. Bot replies: "Telegram linked to your TaxiTrio account"
```

## Callback Data Format

```
accept:<booking_uuid>
reject:<booking_uuid>
```

## Database

Table: `telegram_link_codes`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| driver_id | UUID FK → drivers | |
| code | VARCHAR(10) UNIQUE | 6-digit one-time code |
| expires_at | TIMESTAMP | 10 minutes from generation |
| used | BOOLEAN | default false |

Column added to `drivers`:

| Column | Type | Notes |
|---|---|---|
| telegram_chat_id | VARCHAR(50) | nullable, set after linking |
