# Implementation Plan: Phase 5 (Reviews, Complaints, Notifications & Assistance)

## 1. Customer Reviews
- [ ] Implement `CreateReviewSchema` in `features/reviews/schema.ts`
- [ ] Create `createReview` server action in `features/reviews/actions.ts`
- [ ] Build `ReviewForm` component with star rating and message textarea
- [ ] Integrate `ReviewForm` into `app/(customer)/bookings/[id]/page.tsx` for completed bookings

## 2. Complaints
- [ ] Define `Complaint` type and `CreateComplaintSchema`
- [ ] Build `createComplaint` server action and `useMyComplaints` hook
- [ ] Develop `ComplaintForm` and `ComplaintCard` UI components
- [ ] Set up `app/(customer)/complaints/page.tsx` and `app/(customer)/complaints/new/page.tsx`

## 3. Notifications
- [ ] Define `Notification` type and create fetching/update hooks (`useNotifications`, `useMarkRead`, etc.)
- [ ] Build `NotificationList` and `NotificationBell` components
- [ ] Add `NotificationBell` to the layout navigation header
- [ ] Create `app/(customer)/notifications/page.tsx` full list view

## 4. Tourist Assistance
- [ ] Define `AssistanceItem` type and `useAssistance` hook
- [ ] Develop `AssistanceSection` and `WhatsAppButton` components
- [ ] Assemble `app/(customer)/assistance/page.tsx`
