import { ProjectStatus } from '@/types/ProjectStatus';
import { Chip } from '@mui/material';

function Filters({ state, setState }) {
  const onClick = (value) => {
    setState(value);
  };

  const chips = [
    {
      label: 'On Going',
      value: ProjectStatus.ONGOING,
    },
    {
      label: 'Completed',
      value: ProjectStatus.COMPLETED,
    },
    { label: 'Cancelled', value: ProjectStatus.CANCELLED },
  ];

  return (
    <div className="flex justify-start items-center gap-2 mb-6">
      {chips.map((item, i) => (
        <Chip
          label={item.label}
          color="primary"
          variant={state !== item.value ? 'outlined' : ''}
          onClick={() => onClick(item.value)}
        />
      ))}
    </div>
  );
}

export default Filters;
