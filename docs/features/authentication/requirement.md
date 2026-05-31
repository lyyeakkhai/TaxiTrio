# Authentication — Requirements

## Roles
- Customer, Driver, Admin

## Business Rules
- All auth is handled by Clerk — no custom login/register endpoints
- Role is stored in Clerk `publicMetadata.role`
- Backend verifies every request using the Clerk session token
- Role values: `customer` | `driver` | `admin`

## User Stories
- As any user, I can sign in via Clerk and be redirected to my role-specific dashboard
- As the backend, I can verify who is making a request and what role they have
- As any authenticated user, I can fetch my own profile from the backend
