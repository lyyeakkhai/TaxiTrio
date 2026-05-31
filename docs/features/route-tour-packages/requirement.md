# Route & Tour Packages — Requirements

## Roles
- Customer: browse and book
- Admin: full CRUD

## Business Rules
- Prices are fixed by admin — no negotiation or surge pricing
- Both resources support soft-delete via `is_active`
- Public endpoints return only `is_active = true` records
- Admin endpoints return all records (active + inactive)
- Images uploaded to Cloudinary

## User Stories
- As a customer, I can browse active route and tour packages
- As a customer, I can view full details of a package before booking
- As an admin, I can create, update, deactivate, and delete route and tour packages
