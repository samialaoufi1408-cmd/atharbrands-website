import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/app/actions', () => ({
  sendEnquiry: vi.fn(async () => ({ ok: true })),
}));
import { sendEnquiry } from '@/app/actions';
import { Contact } from './Contact';

describe('Contact', () => {
  it('submits, shows confirmation, clears fields, reverts to idle after 3.2s', async () => {
    vi.useFakeTimers();
    const { container, getByText } = render(<Contact locale="en" />);
    const nameInput = container.querySelector<HTMLInputElement>('input[name="name"]')!;
    const emailInput = container.querySelector<HTMLInputElement>('input[name="email"]')!;
    const msgInput = container.querySelector<HTMLTextAreaElement>('textarea[name="msg"]')!;
    fireEvent.change(nameInput, { target: { value: 'Sami' } });
    fireEvent.change(emailInput, { target: { value: 's@athr.sa' } });
    fireEvent.change(msgInput, { target: { value: 'a legacy' } });

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!);
      // let the promise microtask flush + state update
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(sendEnquiry).toHaveBeenCalledTimes(1);
    expect(getByText('Message Sent')).toBeTruthy();
    expect(nameInput.value).toBe('');
    expect(msgInput.value).toBe('');

    await act(() => vi.advanceTimersByTimeAsync(3300));
    expect(getByText('Send Enquiry')).toBeTruthy();
    vi.useRealTimers();
  });
});
