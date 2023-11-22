import TeamMember from '@/components/common/TeamMember';
import NullView from '@/components/null-views/NullView';
import { useGetProjectQuery } from '@/features/project/apiSice';

function StudentsTab({ handle }) {
    const { data: project } = useGetProjectQuery(handle);

    return (
        <>
            {project.students.length > 0 ? (
                <>
                    <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
                        <p className="body-large font-medium text-primary-dark">
                            Total Students ({project.students.length})
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-4 py-4 px-6 border-b">
                        {project.students.map((user) => (
                            <TeamMember key={user.handle} {...user} isStudent={true} />
                        ))}
                    </div>
                </>
            ) : (
                <NullView
                    imgSrc={'/assets/images/organisation/empty.svg'}
                    heading={'No Students Found'}
                    desc={'There are no students added yet.'}
                />
            )}
        </>
    );
}

export default StudentsTab;
