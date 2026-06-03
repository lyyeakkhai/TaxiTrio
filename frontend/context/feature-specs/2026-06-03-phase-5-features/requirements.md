# Requirements & Scope: Phase 5

## Context
This phase implements crucial customer interaction and support features for TaxiTrio, fulfilling the requirements specified in the project roadmap (Phase 5).

## Scope
- **Reviews**: Customers can rate drivers (1-5 stars) and leave text feedback for completed bookings.
- **Complaints**: Customers can submit structured complaints categorized by issue type, view their status, and see admin replies.
- **Notifications**: Users can view a list of notifications and mark them as read. Polling or refresh-on-load is sufficient; real-time push notifications (e.g., via WebSockets) are NOT required at this stage.
- **Tourist Assistance**: Provide a static or dynamically fetched list of assistance items and a quick action to contact support via WhatsApp.

## Decisions
- **State Management**: Use TanStack query for fetching and caching.
- **Real-time Updates**: Decided against WebSockets for now to save complexity. Standard data fetching will be used for notifications.
- **Architecture**: Stick to the Feature Slice Pattern (e.g. `features/reviews`, `features/complaints`, etc.) as defined in `architecture.md`.
