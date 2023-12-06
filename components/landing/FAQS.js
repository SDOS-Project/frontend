import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

function FAQS() {
    const data = [
        {
            heading:
                'What types of projects can I collaborate on through this platform?',
            desc: "Our platform specializes in facilitating collaborations for B.Tech and M.Tech thesis projects across various disciplines. Whether you're looking for innovative research topics or practical industry applications, you'll find diverse opportunities here.",
        },
        {
            heading:
                'How does the platform match students with industry professionals?',
            desc: 'We use an intuitive matchmaking system that considers your project requirements, academic field, and preferred industry sector to suggest the most suitable partners for collaboration.',
        },
        {
            heading: 'Is my project information secure on this platform?',
            desc: 'Absolutely. We prioritize data security and confidentiality. All project details and communications within the platform are protected with advanced encryption technologies.',
        },
        {
            heading: 'Can I collaborate with international industry partners?',
            desc: 'Yes, our platform supports global collaborations. You can connect with industry professionals from around the world, expanding the scope and impact of your research.',
        },
        {
            heading:
                'What kind of support does the platform offer for project management?',
            desc: 'We provide comprehensive project management tools including progress tracking, scheduling, and secure messaging to streamline your collaboration experience from initiation to completion.',
        },
        {
            heading: 'How do I get started with a project collaboration?',
            desc: 'Simply sign up, complete your profile, and browse through the list of available projects or industry partners. You can initiate a collaboration request directly through the platform.',
        },
        {
            heading: 'Are there any fees associated with using this platform?',
            desc: "Joining and exploring the platform is free. However, certain premium features may be available under a subscription model. Details on pricing and subscriptions are available on our 'Pricing' page.",
        },
        {
            heading: 'What happens if a collaboration does not work out?',
            desc: 'While we strive to ensure successful collaborations, we understand that not every match may be perfect. In such cases, our support team is available to assist in resolving issues or facilitating a change in partnerships if needed.',
        },
    ];

    return (
        <div className="w-full lg:w-2/3 px-4 my-2 lg:my-16">
            <p className="text-center font-semibold body-xlarge mb-4">FAQs</p>
            {data.map((item, i) => (
                <Accordion key={i} className="shadow-sm border-0">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{item.heading}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.desc}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default FAQS;
