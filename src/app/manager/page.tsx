'use client';

import { useEffect, useState } from 'react';
import { Table, Button } from 'flowbite-react';
import { format } from 'date-fns';

import { getAllBookedSlots, cancelSlot, BookSlotAPIresponse } from '@/api/.'

export default function Home() {
  const [bookedSlots, setBookedSlots] = useState<BookSlotAPIresponse[]>([])
  useEffect(() => {
    try {
      getAllBookedSlots().then((res) => {
        setBookedSlots(res);
      })
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleOnSlotCancel = async (slotId: string) => {
    try {
      await cancelSlot({ slotId });
      const bookedSlotsNew = bookedSlots.filter(({ id }) => id !== slotId);
      setBookedSlots(bookedSlotsNew);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="">
      <p className='text-2xl mb-4 underline underline-offset-8'>Booking</p>
      <Table hoverable className='w-1/2'>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>
            {/* Empty column title */}
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {bookedSlots.map(({ id, startDate, bookedCustomerName }) => (
            <Table.Row key={id}>
              <Table.Cell>{format(startDate, 'MMM dd, yyyy : hh:mm')}</Table.Cell>
              <Table.Cell>{bookedCustomerName}</Table.Cell>
              <Table.Cell><Button pill color="red" className="font-bold" onClick={() => handleOnSlotCancel(id)}>X</Button></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

    </div >
  );
}
