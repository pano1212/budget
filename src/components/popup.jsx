    import React, { useState } from 'react';

    function Popup({ close }) {
        const [inputValue, setInputValue] = useState('');
        const [dropdownValue, setDropdownValue] = useState('');

        const handleSave = () => {
            // Add your save logic here
            console.log('Saved:', { dropdownValue, inputValue });
        };

        return (
            <div className='p-1.5 inset-0 z-50 fixed flex justify-center items-center backdrop-brightness-50'>
                <div className='w-1/2 bg-white rounded-lg shadow-lg'>
                    <div className='w-full bg-blue-500 h-8 rounded-t-lg'></div>

                    <div className='flex flex-col mt-3 px-2'>
                        <label className='mb-1'>Select: </label>
                        <select 
                            name="dropdown" 
                            className='w-full border px-2 py-1' 
                            value={dropdownValue}
                            onChange={(e) => setDropdownValue(e.target.value)}
                        >
                            <option value="">-- Select an option --</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>
                    </div>

                    <div className='mt-5 px-2'>
                        <label className='mb-1'>Department: </label>
                        <input 
                            type="text" 
                            className='w-full border px-2 py-1' 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>

                    <div className='flex gap-5 justify-center m-5'>
                        <button 
                            className='w-24 h-10 bg-blue-600 text-white rounded-md' 
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button 
                            className='w-24 h-10 bg-red-600 text-white rounded-md' 
                            onClick={close}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    export default Popup;
