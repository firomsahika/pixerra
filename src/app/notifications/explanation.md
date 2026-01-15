# How Notifications Work in Pixerra

Notifications are a way to keep users engaged by letting them know when something important happens. In Pixerra, we currently track when someone **likes** a design.

## 1. Database Structure
We use a table called `notifications` with the following key columns:
- `user_id`: The ID of the user who **receives** the notification (the design owner).
- `actor_id`: The ID of the user who **triggered** the action (the one who liked).
- `type`: A string like `'like'` or `'message'` to categorize the alert.
- `design_id`: A link to the specific design that was liked.
- `is_read`: A boolean to track if the user has seen it yet.

## 2. Triggering a Notification
When a user clicks the "Like" button, a **Server Action** (`toggleLike`) is executed. 
Inside this action:
1. We check if the user is liking (not unliking).
2. We find the owner of the design.
3. We insert a new row into the `notifications` table.

```typescript
// Example snippet from toggleLike
if (!existingLike) {
    // ... logic to add like ...
    
    // Create notification
    await supabase.from('notifications').insert({
        user_id: designOwnerId,
        actor_id: currentUserId,
        type: 'like',
        design_id: designId
    });
}
```

## 3. Displaying Notifications
On the Notifications page, we fetch all rows where `user_id` matches the current logged-in user, ordered by `created_at` (newest first).

We use **Supabase Joins** to get the actor's profile (their name and avatar) and the design's title in a single request!

---
*Pixerra Developer Team*
