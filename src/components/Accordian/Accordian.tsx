import React, { useEffect, useState } from 'react'


interface AccordionProps {
    icon: any;
    mode: any;
    title: any;
    handleChange: any;
    value: any;
    name: any
}


// eslint-disable-next-line no-dupe-args
const Accordion: React.FC<AccordionProps> = ({ icon, mode, title, handleChange, name, value }) => {
    console.log(value)
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (title.toLowerCase() === 'positions of responsibility') {
            setIsOpen(true);
        }

    }, [])

    useEffect(() => {
        if (value !== "") {
            setIsOpen(true)
        }else if(value === ""){
            console.log('s')
            setIsOpen(false)
        }
    }, [value])

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="row">
            <div className="col-12 mt-3">
                <button className="plus-btn" type="button" onClick={toggleAccordion}><img src={icon} width="20"
                    height="20" alt="" /><span className="ml-1 cc-dark">{title}</span></button>
            </div>
            {isOpen && <div className="col-12 mt-2">
                <textarea rows={4} className="form-control" disabled={mode === 'view'}
                    onChange={handleChange}
                    name={name}
                    value={value}
                ></textarea>
                <div className="text-right"><span className="note">250 words limit</span></div>
            </div>}
        </div>
    )
}

export default Accordion