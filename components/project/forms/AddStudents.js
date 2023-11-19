import { useFieldArray, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

export default function AddStudents({ control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  });

  const textFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
  ];

  console.log('ERRORS', errors);

  return (
    <>
      {fields.map((item, index) => (
        <div className="w-full flex gap-2" key={item.id}>
          {textFields.map((textField) => (
            <div className="w-full" key={textField.name}>
              <Controller
                name={`students.${index}.${textField.name}`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="w-full"
                    size="small"
                    label={textField.label}
                    variant="outlined"
                    error={!!errors?.students?.[index]?.[textField.name]}
                    helperText={
                      errors?.students?.[index]?.[textField.name]
                        ? errors.students[index][textField.name].message
                        : ''
                    }
                  />
                )}
              />
            </div>
          ))}
          <Button variant="outlined" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button
        variant="contained"
        className="bg-primary-main"
        onClick={() => append({ name: '', email: '' })}>
        Add Student
      </Button>
    </>
  );
}
