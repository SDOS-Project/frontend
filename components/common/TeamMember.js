import { Email } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import Link from 'next/link';

export default function TeamMember({ firstName, lastName, email, handle }) {
  return (
    <div className="flex justify-between items-center">
      <Link href={`/user/${handle}`}>
        <div>
          <div className="flex items-center gap-2">
            <Avatar />
            <p>
              {firstName} {lastName}
            </p>
          </div>
        </div>
      </Link>
      <Link href={`mailto:${email}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 items-center">
          <Email className="body-normal" />
          <p className="body-small">{email}</p>
        </div>
      </Link>
    </div>
  );
}