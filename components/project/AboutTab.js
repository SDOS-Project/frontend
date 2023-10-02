import { useGetProjectQuery } from '@/features/project/apiSice';
import { Edit } from '@mui/icons-material';
import { Avatar, Chip } from '@mui/material';

export default function AboutTab({ handle }) {
  const { data: project } = useGetProjectQuery(handle);
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start py-4 px-6 border-b">
        <div className="flex flex-col gap-2">
          <p className="body-large">Status</p>
          <Chip label="On Going" color="primary" />
        </div>
        <div className="flex justify-end gap-2 items-center text-primary-grey cursor-pointer">
          <p className="body-small">Edit Status</p>
          <Edit />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-large">Team</p>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <Avatar className="w-10 h-10" />
            <p className="body-xsmall">Dr. Pankaj Jalote</p>
          </div>
          <p className="body-xsmall">Faculty@IIITD</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <Avatar className="w-10 h-10" />
            <p className="body-xsmall">Mr. Mark Zuckerberg</p>
          </div>
          <p className="body-xsmall">Employee@Meta</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
        <p className="body-normal">Description</p>
        <p className="body-xsmall">{project.description}</p>
      </div>
    </div>
  );
}
