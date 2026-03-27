import { describe, it, expect } from 'vitest';
import { formatBalance, formatAddress, formatTxHash } from '@/lib/formatBalance';
import { ethers } from 'ethers';

describe('formatBalance', () => {
  it('should format balance correctly', () => {
    const balance = ethers.utils.parseEther('1.5');
    const formatted = formatBalance(balance.toString());
    expect(formatted).toBe('1.5');
  });

  it('should format small balance correctly', () => {
    const balance = ethers.utils.parseEther('0.0001');
    const formatted = formatBalance(balance.toString());
    expect(formatted).toBe('0.0001');
  });

  it('should format zero balance', () => {
    const formatted = formatBalance('0');
    expect(formatted).toBe('0');
  });
});

describe('formatAddress', () => {
  it('should format address correctly', () => {
    const address = '0x1234567890123456789012345678901234567890';
    const formatted = formatAddress(address);
    expect(formatted).toBe('0x1234...7890');
  });

  it('should handle short address', () => {
    const address = '0x1234';
    const formatted = formatAddress(address);
    expect(formatted).toBe('0x1234');
  });

  it('should handle empty address', () => {
    const formatted = formatAddress('');
    expect(formatted).toBe('');
  });
});

describe('formatTxHash', () => {
  it('should format transaction hash correctly', () => {
    const hash = '0x1234567890123456789012345678901234567890123456789012345678901234';
    const formatted = formatTxHash(hash);
    expect(formatted).toBe('0x12345678...78901234');
  });
});
