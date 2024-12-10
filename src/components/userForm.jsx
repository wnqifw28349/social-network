"use client";

export default function UserForm({ userFormAction }) {
  return (
    <div>
      <form action={userFormAction}>
        <input name="username" placeholder="Username" />
        <textarea name="bio" placeholder="Bio" />
        <button>Submit</button>
      </form>
    </div>
  );
}
