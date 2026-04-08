import Group from "@/components/semantic/group"
import AddEditFolderModal from "./add-edit-folder"
import Searchbar from "./search"
import TabContent from "./tab-content"
import Tabs from "./tabs"

const Sidebar = () => {
    return (
        <Group className="flex flex-col h-full relative">
            <Searchbar />
            <div className="flex overflow-hidden h-full">
                <Tabs />
                <TabContent />
            </div>
            <AddEditFolderModal />
        </Group>
    )
}

export default Sidebar
