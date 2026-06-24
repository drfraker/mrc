export const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Working with MRC', href: '/working-with-mrc' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
] as const;

export const CONTACT = {
    phonePrimary: '406.219.3366',
    phonePrimaryHref: 'tel:+14062193366',
    phoneSecondary: '406.205.3172',
    phoneSecondaryHref: 'tel:+14062053172',
    email: 'info@medreviewconsultants.com',
    address: ['PO Box 1745', 'Bozeman, MT 59771'],
    person: 'Chelsea Embry, RN, BSN',
} as const;

export const SERVICE_LINKS = [
    {
        label: 'Medicare Utilization Review',
        href: '/services#utilization-review',
    },
    { label: 'Physician Peer Review', href: '/services#peer-review' },
    { label: 'RAC Appeal Assistance', href: '/services#rac-appeals' },
    { label: 'Medicare Staff Education', href: '/services#education' },
] as const;
