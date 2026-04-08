import Group from "@/components/semantic/group"
import Avatar from "./avatar"
import ProfileSheet from "./profile-sheet"
import Search from "./search"

const Searchbar = () => {
    return (
        <Group className="flex items-center border-b py-4.5">
            <Avatar />
            <Search />
            <ProfileSheet />
        </Group>
    )
}

export default Searchbar
