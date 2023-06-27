import { FC, useState } from "react";
import Button from "@/components/common/Button";
import { BsYoutube } from "react-icons/bs";

interface Props {
    onSubmit(link: string): void
}

export type linkOption = {
    url: string,
    openInNewTab: boolean
}

const EmbedYoutubeLink: FC<Props> = ({ onSubmit }): JSX.Element => {
    const [visible, setVisible] = useState(false);
    const [url, setUrl] = useState("");

    const handleSubmit = () => {
        if (!url.trim()) return hideForm();

        onSubmit(url);
        setUrl('');
        hideForm();
    }

    const hideForm = () => setVisible(false);
    const showForm = () => setVisible(true);

   return <div onKeyDown={({key}) => { if (key === "Escape") hideForm() }} className="relative">
        <Button onClick={() => {visible ? hideForm() : showForm()}}> 
            <BsYoutube />
        </Button>

        {visible && (<div className="absolute top-full mt-4 z-50 right-0">
            <div className="flex space-x-2">
                <input autoFocus type="text" className="bg-transparent  rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary" placeholder="http://youtube.com" value={url} onChange={({target}) => setUrl(target.value)} />

                <button onClick={() => {handleSubmit()}} className="bg-action p-2 text-primary rounded text-sm">Embed</button>
            </div>
        </div>)}
    </div>
};

export default EmbedYoutubeLink;
