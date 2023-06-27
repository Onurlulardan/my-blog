import { FC, useState } from "react";
import Button from "@/components/common/Button";
import { BsLink45Deg } from "react-icons/bs";
import LinkForm, { LinkOptions } from "./LinkForm";

interface Props {
    onSubmit(link: LinkOptions): void
}

export type linkOption = {
    url: string,
    openInNewTab: boolean
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = (link: LinkOptions) => {
        if (!link.url.trim()) return hideForm();

        onSubmit(link);
        hideForm();
    }

    const hideForm = () => setVisible(false);
    const showForm = () => setVisible(true);

   return <div onKeyDown={({key}) => { if (key === "Escape") hideForm() }} className="relative">
        <Button onClick={() => {visible ? hideForm() : showForm()}}> 
            <BsLink45Deg />
        </Button>

        <div className="absolute top-full mt-4 z-50 right-0">
            <LinkForm visible={visible} onSubmit={handleSubmit} />
        </div>
   </div>
};

export default InsertLink;
