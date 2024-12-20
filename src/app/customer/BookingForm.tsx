import { useEffect, useMemo, useState } from 'react';
import { Datepicker, Button, Modal, TextInput } from 'flowbite-react'
import { format } from 'date-fns';

import { getSlots, bookSlot } from '@/api/.'

interface SlotProps {
    id: string,
    startDate: string
}

interface BookingProps {
    onBookingComplete: (prop: any) => void
}

export const BookingForm = ({ onBookingComplete }: BookingProps) => {

    // default date is here just to make code review and testing easier
    // Todo: Will be removed before merging
    const defaultDate = new Date('08/01/2024');
    const [slots, setSlots] = useState<SlotProps[]>([]);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
    const [userName, setUserName] = useState('');
    const [selectedSlot, setSelectedSlot] = useState({ slot: '', id: '' });
    // This is a work around, better would be include duration in slot booking flow with BE support
    const duration = '60 minutes';

    useEffect(() => {
        try {
            const dateFormatted = format(selectedDate, 'yyyy-MM-dd');
            getSlots({ date: dateFormatted }).then((slots) => {
                setSlots(slots);
            });
        } catch (e) {
            // We can improve error handling with proper error handling using state and components
            console.error(e);
        }
    }, [selectedDate]);

    const renderSlotsUI = useMemo(() => {
        return slots.map(
            ({ id, startDate }) => {
                const slot = format(new Date(startDate), 'HH:mm');
                return (
                    <Button
                        key={id}
                        onClick={() => {
                            setIsConfirmationOpen(true);
                            setSelectedSlot({ slot, id });
                        }}
                        className="mr-2 mb-2"
                        color='gray'
                        pill
                    >
                        {slot}
                    </Button>)
            }
        )
    }, [slots])

    const handleModalCloseButton = () => setIsConfirmationOpen(false);
    const handleModalBookButton = async () => {
        try {
            await bookSlot({ slotId: selectedSlot.id, name: userName }).then((res) => {
                onBookingComplete({ ...res, duration });
            });
            setIsConfirmationOpen(false);
        } catch (e) {
            // We can improve error handling with proper error handling using state and components
            console.error(e);
        }
    };

    return (<>
        <div className='flex mb-4'>
            <label htmlFor='datePicker' className='mr-8 min-w-28 text-xl leading-10'>Date:</label>
            <Datepicker
                id="datePicker"
                showTodayButton={false}
                showClearButton={false}
                value={selectedDate}
                placeholder="Select a date"
                onChange={
                    (userInput) => {
                        userInput && setSelectedDate(userInput);
                    }
                }
            />
        </div>
        <div className='flex'>
            <label htmlFor='slots' className='mr-8 min-w-28 text-xl leading-10'>Pick a slot:</label>
            <div id='slots' className='flex flex-wrap cursor-pointer'>
                {slots.length > 0 ?
                    renderSlotsUI :
                    <p className='mr-8 text-l text-orange-400 leading-10'>Slots not found!</p>
                }
            </div>
        </div>
        <Modal size="md" show={isConfirmationOpen} onClose={handleModalCloseButton}>
            <Modal.Header>Book this slot?</Modal.Header>
            <Modal.Body>
                <p className=''></p>
                <div className='flex'>
                    <label htmlFor="username" className='leading-10 min-w-28'>Your Name:</label>
                    <TextInput maxLength={50} value={userName} id="username" onChange={(eve) => setUserName(eve.target.value.replace(/[^a-zA-Z\s]/g, ''))} placeholder='Enter your name'></TextInput>
                </div>
                <div className='flex'>
                    <p className='leading-10 min-w-28'>Date:</p>
                    <p className='leading-10 text-gray-500'>{format(selectedDate, 'MMM d, yyyy')}</p>
                </div>
                <div className='flex'>
                    <p className='leading-10 min-w-28'>Time:</p>
                    <p className='leading-10 text-gray-500'>{selectedSlot.slot}</p>
                </div>
                <div className='flex'>
                    <p className='leading-10 min-w-28'>Duration:</p>
                    <p className='leading-10 text-gray-500'>{duration}</p>
                </div>
                <div className='flex justify-center mt-4'>
                    <Button className='mx-4' color='gray' onClick={handleModalCloseButton}>Cancel</Button>
                    <Button className='mx-4' onClick={handleModalBookButton}>Book</Button>
                </div>
            </Modal.Body>
        </Modal>
    </>);
}