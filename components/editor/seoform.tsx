import React, { FC, ChangeEventHandler, useState, useEffect } from 'react';
import classNames from 'classnames';
import slugify from 'slugify';

export interface SeoResult {
    meta: string;
    slug: string;
    tags: string;
}

interface Props {
    initialValue?: SeoResult,
    title?: string,
    onChange(result: SeoResult): void
}

const commonInputClass = "w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition p-2 text-primary-dark dark:text-primary";

const SeoForm: FC<Props> = ({ initialValue,  title= '', onChange }): JSX.Element => {
    const [values, setValues] = useState({ meta: '', slug: '', tags: '' });

    const { meta, slug, tags } = values;

    const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = ({ target }) => {
        let { value, name } = target;
        if (name === 'meta') value = value.substring(0, 150);
        const newValues =  {...values, [name]: value}
        setValues(newValues);
        onChange(newValues);
    }

    useEffect(() => {
        const slug = slugify(title.toLocaleUpperCase());
        const newValues = {...values, slug};
        setValues(newValues);
        onChange(newValues);
    },[title]);

    useEffect(() => {
        if (initialValue) {
            setValues({...initialValue, slug: slugify(initialValue.slug)});
        }
    },[initialValue]);
    

  return (
    <div className='space-y-4'>
        <h1 className='text-primary-dark dark:text-primary text-xl font-semibold'>Seo Section</h1>
        <Input onChange={handleChange} value={slug} name='slug' placeHolder='slug-goes-here' label='Slug:' />
        <Input onChange={handleChange} value={tags} name='tags' placeHolder='ReactJS NextJS NodeJS' label='Tags:' />

        <div className='relative'>
            <textarea onChange={handleChange} value={meta} name='meta' className={classNames(commonInputClass, 'text-xl resize-none h-20')} placeholder='Meta Descriptions 150 characters will be fine'></textarea>
            <p className='absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm'>{meta.length}/150</p>
        </div>
    </div>
  )
}

const Input: FC<{
    name?: string,
    value?: string,
    placeHolder?: string,
    label?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>
}> = ({name, value, placeHolder, label, onChange }) => {
    return <label className='block relative'>
        <span className='absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2'>
            {label}
        </span>
        <input 
            type="text" 
            placeholder={placeHolder} 
            className={classNames(commonInputClass, 'italic pl-12')}
            name={name}
            onChange={onChange}
            value={value}
        />
    </label>
}

export default SeoForm