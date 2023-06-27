import { FC, useEffect, useState } from "react";
import { validateUrl } from "../editorUtils";

interface Props {
  visible: boolean,
  onSubmit(link: LinkOptions): void,
  initialState?: LinkOptions
}

export type LinkOptions = {
  url: string,
  openInNewTab: boolean, 
}

const defaultLink = {url: "", openInNewTab: false }

const LinkForm: FC<Props> = ({ visible, initialState, onSubmit }): JSX.Element | null => {
  const [link, setLink] = useState<LinkOptions>(defaultLink);

  const handleSubmit = () => {
    onSubmit({...link, url: validateUrl(link.url)});
    resetFrom();
  }

  const resetFrom = () => {
        setLink({...defaultLink})
  };

  useEffect(() => {
    if(initialState) setLink({...initialState});
  }, [initialState]);

  if(!visible) return null

  return (
    <div className="rounded p-2 bg-primary dark:bg-primary-dark shadow-sm shadow-secondary-dark">
      <input autoFocus type="text" className="bg-transparent  rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary" placeholder="http://example.com" value={link.url} onChange={({target}) => { setLink({...link, url: target.value}) }} />

      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="open-in-new-tab" checked={link.openInNewTab} onChange={({target}) => { setLink({...link, openInNewTab: target.checked}) }} />
        <label htmlFor="open-in-new-tab">Open in new tab</label>

        <div className="flex-1 text-right">
          <button onClick={() => {handleSubmit()}} className="bg-action px-2 py-1 text-primary rounded text-sm">Apply</button>
        </div>
      </div>
    </div>
  )
}

export default LinkForm