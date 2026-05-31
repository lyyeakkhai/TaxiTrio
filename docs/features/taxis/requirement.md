# Taxis — Requirements

## Roles
- Customer: browse available taxis
- Admin: full CRUD

## Business Rules
- Only taxis with `is_active = true` are shown to customers
- Admin can deactivate a taxi without deleting it (preserves booking history)
- Each taxi is linked to a driver via `drivers.taxi_id`
- Photos are uploaded to Cloudinary — no local storage
- Plate number must be unique

## User Stories
- As a customer, I can browse available taxis with vehicle details and driver info
- As a customer, I can view a single taxi's full detail before booking
- As an admin, I can create, update, deactivate, and delete taxis
- As an admin, I can assign a driver to a taxi
