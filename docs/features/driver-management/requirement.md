# Driver Management — Requirements

## Roles
- Driver: manage own profile, availability, view earnings and reviews
- Admin: full CRUD, approve/reject drivers

## Business Rules
- Driver must be approved before receiving bookings
- Driver photo uploaded to Cloudinary
- Languages field supports multiple values (Khmer, English, Chinese, Japanese, Korean, French)
- Admin can update any driver record
- Deleting a driver is only allowed if they have no active bookings

## User Stories
- As a driver, I can update my profile (name, phone, languages, photo)
- As a driver, I can toggle my availability
- As a driver, I can view my earnings and customer reviews
- As an admin, I can list, view, approve, reject, update, and delete drivers
