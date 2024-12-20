import { Button } from "flowbite-react"

import { cancelSlot } from '@/api/.';

interface BookingConfirmationProps {
    name: string,
    date: string,
    slot: string,
    duration: string,
    id: string,
    onBookingCancel: () => void
}

export const BookingConfirmation = ({ name, date, slot, duration, id, onBookingCancel }: BookingConfirmationProps) => {

    const handleBookingCancellation = async (id: string) => {
        try {
            await cancelSlot({ slotId: id }).then(() => {
                onBookingCancel();
            });
        } catch (e) {
            // We can improve error handling with proper error handling using state and components
            console.error(e);
        }
    }

    return (<div>
        <p className="text-xl">Hello <span className="text-lg">{name}</span>!</p>
        <p className="text-xl text-blue-500">Your booking slot</p>
        <p>Date: <span className="text-gray-600">{date}</span></p>
        <p>Time: <span className="text-gray-600">{slot}</span></p>
        <p>Duration: <span className="text-gray-600">{duration}</span></p>
        <div className="flex mt-4">
            <Button color="red" className="mx-4" onClick={() => handleBookingCancellation(id)}>Cancel booking</Button>
            <Button color="green" className="mx-4">Join your call</Button>
        </div>
    </div>)
}