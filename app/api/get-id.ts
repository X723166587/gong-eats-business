export default function getID(slug: string) {
    return slug.split('_id%3D')[1] // = -> %3D
}