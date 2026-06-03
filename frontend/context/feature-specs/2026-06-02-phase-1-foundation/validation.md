# Validation Criteria

To ensure the Phase 1 Foundation implementation is successful and ready to be merged, the following criteria must be met:

1. **Build Success:**
   - Code successfully compiles without errors: `npm run build` passes cleanly.
   
2. **Linting & Typing:**
   - Zero TypeScript errors and clean linting: `npm run lint` passes cleanly.

3. **Routing Verification:**
   - Accessing a `/(customer)/*` route without being logged in correctly redirects to the Clerk sign-in.
   - Accessing a `/(customer)/*` route as a `driver` is restricted.
   - Accessing a `/(driver)/*` route as a `customer` is restricted.

4. **i18n Verification:**
   - Changing the locale properly loads the correct `messages/*.json` file.

5. **Token Injection:**
   - The Axios instance in `lib/api.ts` properly extracts the Clerk token.
