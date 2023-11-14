import { Email } from '@mui/icons-material';
import { Avatar, Button, Tooltip } from '@mui/material';
import Link from 'next/link';
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { UserRole } from '@/types/UserRole';

export default function TeamMember({
  firstName,
  lastName,
  email,
  handle,
  imgUrl,
  canRemove = false,
  role,
  handleRemoveUser,
}) {
  return (
    <div className="flex justify-between items-center">
      <Link href={`/user/${handle}`}>
        <div className="flex items-center gap-2">
          <Avatar
            className="w-8 h-8 sm:h-10 sm:w-10 body-small sm:body-normal"
            src={imgUrl}>
            {firstName[0] + lastName[0]}
          </Avatar>
          <p>
            {firstName} {lastName}
          </p>
          <Tooltip title={UserRole[role]}>
            <div className="bg-primary-main text-white p-1.5 flex justify-center rounded-full">
              {UserRole[role] == UserRole.FACULTY ? (
                <SchoolIcon className="body-xsmall" />
              ) : (
                <CorporateFareIcon className="body-xsmall" />
              )}
            </div>
          </Tooltip>
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
          onClick={() => handleRemoveUser(handle)}>
          Remove
        </Button>
      )}
    </div>
  );
}
