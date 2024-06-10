import { useState } from "react"
import { CreateRandomListDialog } from "./components/CreateAutomaticList";
import { CreateListDialog } from "./components/CreateManualList";
import { DisplayList } from "./components/CurrentListContainer";

export const HomePage = () => {

    const [randomDialogVisible, setRandomDialogVisible] = useState<boolean>(false);
    const [regularDialogVisible, setRegularDialogVisible] = useState<boolean>(false);

    return (
        <div className="page-container">
            <DisplayList
                setRandomDialogVisible={setRandomDialogVisible}
                randomDialogVisible={randomDialogVisible}
                regularDialogVisible={regularDialogVisible}
                setRegularDialogVisible={setRegularDialogVisible} />

            <CreateRandomListDialog
                setIsVisible={setRandomDialogVisible}
                isVisible={randomDialogVisible} />

            <CreateListDialog
                regularDialogVisible={regularDialogVisible}
                setRegularDialogVisible={setRegularDialogVisible} />
        </div >
    )
}
