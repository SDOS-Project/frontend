import { Email } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import Link from 'next/link';

export default function TeamMember({
  firstName,
  lastName,
  email,
  handle,
  canRemove = false,
  handleRemoveUser,
}) {
  return (
    <div className="flex justify-between items-center">
      <Link href={`/user/${handle}`}>
        <div>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 sm:h-10 sm:w-10 body-small sm:body-normal">
              {firstName[0] + lastName[0]}
            </Avatar>
            <p>
              {firstName} {lastName}
            </p>
          </div>
        </div>
      </Link>
      <Link href={`mailto:${email}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 items-center">
          <Email className="body-normal" color="primary" />
          <p className="body-small">{email}</p>
        </div>
      </Link>
      {canRemove && (
        <Button
          variant="contained"
          className="bg-error-dark"
          color="error"
          onClick={handleRemoveUser}>
          Remove
        </Button>
      )}
    </div>
  );
}
