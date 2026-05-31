# Tourist Assistance — Requirements

## Roles
- Customer: read-only
- Admin: full CRUD

## Business Rules
- Public endpoint returns only `is_active = true` items
- Admin can deactivate without deleting

## User Stories
- As a customer, I can view travel assistance content (emergency contacts, language tips, route info)
- As an admin, I can create, update, deactivate, and delete assistance content
