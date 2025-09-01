# College Event App

A UI-only implementation of a College Event App's initial flow, built with React, Next.js, and Tailwind CSS.

## Mock Data

The ParentServer component simulates server-side data fetching with three mock users:

1. **Student with incomplete profile**
   - ID: `u-student-001`
   - Name: Asha Rao
   - Role: STUDENT
   - Profile Status: Incomplete

2. **Admin with incomplete profile**
   - ID: `u-admin-001`
   - Name: Ravi Menon
   - Role: ADMIN
   - Profile Status: Incomplete

3. **Student with completed profile**
   - ID: `u-student-002`
   - Name: Neha Patel
   - Role: STUDENT
   - Profile Status: Complete

## How to Test Different User Flows

To test different user flows, modify the `userId` parameter in the ParentServer component:

```tsx
// In your page.tsx or wherever you're using ParentServer
import ParentServer from './components/ParentServer';

export default function Home() {
  return (
    <ParentServer userId="u-student-001" />
  );
}
```

Change the userId to one of the following:
- `u-student-001`: Shows the student profile completion form
- `u-admin-001`: Shows the admin profile completion form
- `u-student-002`: Shows the main shell (already completed profile)

## Simulated States

The ParentServer component simulates the following states:

1. **Loading**: Shows a skeleton UI for 1.5 seconds
2. **Error**: Has a 10% chance of showing an error with a retry button
3. **Success**: Shows the appropriate component based on the user's profile status

## Component Structure

- **ParentServer**: Server-side component that fetches mock data and renders child components
- **ProfileCompletion**: Determines which form to show based on user role
- **StudentForm**: Form for students to complete their profile
- **AdminForm**: Form for admins to complete their profile
- **MainShellStub**: Minimal app shell UI shown after profile completion

## Implementation Notes

- This is a UI-only implementation with no backend or database logic
- Form submissions are simulated with timeouts
- The design follows the theme from the provided images
- The app is responsive and accessible
