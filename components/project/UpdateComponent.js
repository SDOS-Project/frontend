import { Avatar } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';

export default function UpdateComponent({ user, content, createdAt }) {
  return (
    <div className="flex gap-2">
      <Avatar className="w-10 h-10 body-small" src={user?.imgUrl}>
        {user?.firstName[0] + user?.lastName[0]}
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <Link href={`/user/${user?.handle}`}>
            <p className="body-normal text-primary-dark">
              {user?.firstName} {user?.lastName}
            </p>
          </Link>
          <p className="body-xsmall text-primary-darkgrey">
            {format(new Date(createdAt), 'h:mma,  MMMM d, yyyy')}
          </p>
        </div>
        <p className="body-small">{content}</p>
      </div>
    </div>
  );
}
