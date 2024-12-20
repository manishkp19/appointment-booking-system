'use client';

import { useEffect, useMemo, useState } from 'react';
import { Datepicker, Button, Modal, TextInput } from 'flowbite-react'
import { format } from 'date-fns';

import { getSlots, bookSlot, cancelSlot, getBookedSlot } from '@/api/.'

interface SlotProps {
    id: string,
    startDate: string
}

export default function Home() {

    // default date is here just to make code review and testing easier
    // Todo: Will be removed before merging
    const defaultDate = new Date('08/01/2024');

    const [slots, setSlots] = useState<SlotProps[]>([]);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
    const [userName, setUserName] = useState('');
    const [selectedSlot, setSelectedSlot] = useState({ slot: '', id: '' });
    const [showConfirmation, setShowConfirmation] = useState(false);
    // This is a work around, better would be to include duration in slot booking flow with BE support
    const duration = '60 minutes';

    const handleModalCloseButton = () => {
        setIsConfirmationOpen(false)
        setShowConfirmation(false);
    };
    const handleModalBookButton = async () => {
        try {
            await bookSlot({ slotId: selectedSlot.id, name: userName }).then(() => {
                // Booking complete
                setShowConfirmation(true);
            });
        } catch (e) {
            // We can improve error handling with proper error handling using state and components
            console.error(e);
        }
    };
    const handleBookingCancellation = async () => {
        try {
            await cancelSlot({ slotId: selectedSlot.id }).then(() => {
                setShowConfirmation(false);
            });
        } catch (e) {
            // We can improve error handling with proper error handling using state and components
            console.error(e);
        }
    }

    const handleSlotClick = async (slot: string, id: string) => {
        setSelectedSlot({ slot, id });
        try {
            const { isBooked, bookedCustomerName } = await getBookedSlot({ slotId: id });
            if (isBooked) {
                setUserName(bookedCustomerName);
                setShowConfirmation(true);
            }
        } catch (e) {
            console.error(e);
        }
        setIsConfirmationOpen(true);
    }

    useEffect(() => {
        try {
            if (selectedDate || showConfirmation) {
                const dateFormatted = format(selectedDate, 'yyyy-MM-dd');
                getSlots({ date: dateFormatted }).then((slots) => {
                    setSlots(slots);
                });
            }
        } catch (e) {
            // We can improve error handling with proper error handling using state and components
            console.error(e);
        }
    }, [selectedDate, showConfirmation]);

    const renderSlotsUI = useMemo(() => {
        return slots.map(
            ({ id, startDate }) => {
                const slot = format(new Date(startDate), 'HH:mm');
                return (
                    <Button
                        key={id}
                        onClick={() => handleSlotClick(slot, id)}
                        className="mr-2 mb-2"
                        color='gray'
                        pill
                    >
                        {slot}
                    </Button>)
            }
        )
    }, [slots]);

    const renderBookingConfirmation = () => {
        return <>
            <p className="text-xl">Hello <span className="text-lg">{userName}</span>!</p>
            <p className="text-xl text-blue-500">Your booking slot</p>
            <p>Date: <span className="text-gray-600">{format(selectedDate, 'MMM d, yyyy')}</span></p>
            <p>Time: <span className="text-gray-600">{selectedSlot.slot}</span></p>
            <p>Duration: <span className="text-gray-600">{duration}</span></p>
            <div className="flex justify-center mt-4">
                <Button color="red" className="mx-4" onClick={handleBookingCancellation}>Cancel booking</Button>
                <Button color="green" className="mx-4" onClick={() => alert('Video call')}>Join your call</Button>
            </div>
        </>
    };

    const renderBookingForm = () => {
        return <>
            <div className='flex'>
                <label htmlFor="username" className='leading-10 min-w-28'>Your Name:</label>
                <TextInput maxLength={50} disabled={showConfirmation} value={userName} id="username" onChange={(eve) => setUserName(eve.target.value.replace(/[^a-zA-Z\s]/g, ''))} placeholder='Enter your name'></TextInput>
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
        </>
    };

    return (
        <>
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
                            // userInput null possibility is removed so explicitly telling the type
                            setSelectedDate(userInput as Date);
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
                <Modal.Header>
                    {showConfirmation ? 'Booking confirmed' : 'Book this slot?'}
                </Modal.Header>
                <Modal.Body>
                    {showConfirmation ? renderBookingConfirmation() : renderBookingForm()}
                </Modal.Body>
            </Modal>
        </>
    );
}