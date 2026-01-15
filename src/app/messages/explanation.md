# Simple Messaging System Explanation

Pixerra uses a straight-forward 1-on-1 messaging model to connect designers.

## 1. Database Structure
We use a single `messages` table for maximum simplicity:
- `sender_id`: The user who wrote the message.
- `receiver_id`: The user who gets the message.
- `content`: The text of the message.
- `is_read`: Tracks if the recipient has opened the chat.

## 2. Conversations (The "Inbox")
To show a list of people you're chatting with (the Inbox), we perform a query that:
1. Finds all unique users you've exchanged messages with.
2. Gets the latest message for each of those users.

This "groups" individual messages into a conversation view!

## 3. Real-time Updates (Future Step)
Currently, we fetch messages when the page loads. In a real-world app, we would use **Supabase Realtime** to listen for new rows in the `messages` table and update the UI instantly without refreshing.

## 4. Sending a Message
When you type a message and hit send:
1. We call a Server Action.
2. We insert a row with `sender_id` (you) and `receiver_id` (the person you're chatting with).
3. The page "revalidates" to show your new message immediately.

---
*Pixerra Developer Team*
