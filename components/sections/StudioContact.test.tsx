import { act, fireEvent, render, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/app/actions', () => ({ sendEnquiry: vi.fn() }));
import { sendEnquiry } from '@/app/actions';
import { StudioContact } from './StudioContact';
import { StudioMobileMenu } from './StudioMobileMenu';

beforeEach(() => { vi.mocked(sendEnquiry).mockReset(); });
afterEach(() => { cleanup(); window.history.replaceState({}, '', '/'); });

function fillForm(ui: ReturnType<typeof render>) {
  fireEvent.change(ui.getByLabelText('Name'), { target: { value: 'Test user' } });
  fireEvent.change(ui.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(ui.getByLabelText('Business or project name'), { target: { value: 'Test business' } });
  fireEvent.change(ui.getByLabelText('Service needed'), { target: { value: 'Brand strategy' } });
  return ui.container.querySelector('form')!;
}

describe('Studio contact', () => {
  it('prefills loyalty and retains safe campaign attribution with the submitted enquiry', async () => {
    window.history.replaceState({}, '', '/en/services/loyalty?utm_source=tiktok&utm_campaign=loyalty_cafes_202609&email=private@example.com');
    vi.mocked(sendEnquiry).mockResolvedValue({ ok: true });
    const ui = render(<StudioContact locale="en" service="loyalty"/>);
    expect(ui.getByLabelText('Service needed')).toHaveValue('Digital loyalty card design and setup');
    fireEvent.change(ui.getByLabelText('Name'), { target: { value: 'Test user' } });
    fireEvent.change(ui.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(ui.getByLabelText('Business or project name'), { target: { value: 'Test cafe' } });
    await act(async () => { fireEvent.submit(ui.container.querySelector('form')!); });
    const input = vi.mocked(sendEnquiry).mock.calls[0][0];
    expect(input.vision).toContain('Digital loyalty card design and setup');
    expect(input.vision).toContain('utm_source: tiktok');
    expect(input.vision).toContain('Enquiry page: /en/services/loyalty');
    expect(input.vision).not.toContain('private@example.com');
    expect(decodeURIComponent(ui.getByRole('link', { name: 'Chat on WhatsApp' }).getAttribute('href')!)).toContain('loyalty card');
  });
  it('keeps the brief on server errors and offers direct WhatsApp contact', async () => {
    vi.mocked(sendEnquiry).mockResolvedValue({ ok: false, error: 'unconfigured' });
    const ui = render(<StudioContact locale="en"/>);
    const form = fillForm(ui);
    await act(async () => { fireEvent.submit(form); });
    expect(ui.getByRole('alert')).toHaveTextContent('could not be sent');
    expect(ui.getByLabelText('Name')).toHaveValue('Test user');
    expect(ui.getByLabelText('Business or project name')).toHaveValue('Test business');
    expect(ui.getByRole('link', { name: 'Chat on WhatsApp' })).toHaveAttribute('href', expect.stringContaining('https://wa.me/966599444486'));
  });

  it('prevents repeat submissions while pending', async () => {
    let finish!: (result: { ok: boolean }) => void;
    vi.mocked(sendEnquiry).mockImplementation(() => new Promise(resolve => { finish = resolve; }));
    const ui = render(<StudioContact locale="en"/>);
    const form = fillForm(ui);
    await act(async () => { fireEvent.submit(form); });
    expect(ui.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    await act(async () => { fireEvent.submit(form); });
    expect(sendEnquiry).toHaveBeenCalledTimes(1);
    await act(async () => { finish({ ok: false }); });
    expect(ui.getByRole('alert')).toBeTruthy();
    expect(ui.getByRole('button', { name: 'Send project enquiry' })).toBeEnabled();
  });

  it('handles a rejected request without losing the brief', async () => {
    vi.mocked(sendEnquiry).mockRejectedValue(new Error('network'));
    const ui = render(<StudioContact locale="en"/>);
    const form = fillForm(ui);
    await act(async () => { fireEvent.submit(form); });
    expect(ui.getByRole('alert')).toBeTruthy();
    expect(ui.getByLabelText('Name')).toHaveValue('Test user');
  });

  it('does not send a honeypot submission', async () => {
    const ui = render(<StudioContact locale="en"/>);
    const form = fillForm(ui);
    fireEvent.change(ui.container.querySelector('input[name="website"]')!, { target: { value: 'spam' } });
    await act(async () => { fireEvent.submit(form); });
    expect(sendEnquiry).not.toHaveBeenCalled();
  });

  it('closes the mobile menu on navigation and on Escape', () => {
    const ui = render(<StudioMobileMenu locale="ar"/>);
    const menu = ui.container.querySelector('details')!;
    menu.open = true;
    fireEvent.click(ui.getByRole('link', { name: 'الخدمات' }));
    expect(menu.open).toBe(false);
    menu.open = true;
    fireEvent.keyDown(menu, { key: 'Escape' });
    expect(menu.open).toBe(false);
    expect(ui.container.querySelector('summary')).toHaveFocus();
  });
});
