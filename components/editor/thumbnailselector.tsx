import classNames from "classnames";
import React, {FC, ChangeEventHandler, useState, useEffect} from "react";

interface Props {
    initialValue?: string,
    onChange(file: File): void
}

const commonClass = "border border-dashed border-secondary-dark dark:border-secondary-light flex items-center justify-center rounded cursor-pointer aspect-video";

const ThumbNailSelector: FC<Props> = ({ initialValue, onChange }): JSX.Element => {

    const [selectedThumbNail, setSelectedThumbNail] = useState('');

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { files } = target;
        if (!files) return

        const file = files[0]
        setSelectedThumbNail(URL.createObjectURL(file));
        onChange(file);
    }

    useEffect(() => {
        if ( typeof initialValue === 'string') setSelectedThumbNail(initialValue);
    }, [selectedThumbNail]);

    return <div className="w-32 ">
        <input 
            type="file" 
            hidden 
            accept="image/jpg, image/png, image/jpeg" 
            id="thumbnail" 
            onChange={handleChange}
        />
        <label htmlFor="thumbnail">
            { selectedThumbNail ? 
            ( 
                <img src={selectedThumbNail} alt="ThumbNail" className={classNames(commonClass, 'object-cover')} />
            ) : 
            (
                <PosterUI label="Thumbnail" />
            ) }
        </label>
    </div>
}

const PosterUI: FC<{ label: string, className?: string }> = ({label, className}) => {
    return <div className={classNames(commonClass, className)}>
        <span> {label} </span>
    </div>
}

export default ThumbNailSelector