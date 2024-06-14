import { useState } from 'react';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const [customerQuery, setCustomerQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerField[]>([]);

  // Function to handle input change and filter customers
  const handleInputChange = (query: string) => {
    setCustomerQuery(query);
    // Filter customers based on the query
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    // Perform action with form data, e.g., create invoice
    createInvoice(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Customer Name */}
      <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Customer Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="customer"
            name="customerId"
            value={customerQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type to search customer..."
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          {/* Show filtered customers */}
          {filteredCustomers.length > 0 && (
            <div className="mt-1 rounded-md bg-white shadow-lg">
              {filteredCustomers.map(customer => (
                <div
                  key={customer.id}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setCustomerQuery(customer.name);
                    setFilteredCustomers([]);
                  }}
                >
                  {customer.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invoice Amount */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Invoice Amount
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      {/* Invoice Status */}
      <fieldset className="mb-4">
        <legend className="mb-2 block text-sm font-medium">
          Set the invoice status
        </legend>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              id="pending"
              name="status"
              type="radio"
              value="pending"
              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
            />
            <label
              htmlFor="pending"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
            >
              Pending <ClockIcon className="h-4 w-4" />
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="paid"
              name="status"
              type="radio"
              value="paid"
              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
            />
            <label
              htmlFor="paid"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
            >
              Paid <CheckIcon className="h-4 w-4" />
            </label>
          </div>
        </div>
      </fieldset>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
