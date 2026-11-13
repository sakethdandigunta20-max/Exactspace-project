import { describe, it, expect } from 'vitest';
import { OFFICIAL_USER_LIST, CHANNELS } from '../../server/server.js';

describe('Assignment 1: Backend WebSocket & REST Server Specs', () => {
  it('defines the official user list required by Assignment 1', () => {
    expect(OFFICIAL_USER_LIST).toEqual(["Alan", "Bob", "Carol", "Dean", "Elin"]);
  });

  it('configures channels matching reference implementation', () => {
    expect(CHANNELS.length).toBeGreaterThanOrEqual(3);
    const introChannel = CHANNELS.find((c) => c.id === 'introductions');
    expect(introChannel).toBeDefined();
    expect(introChannel.name).toBe('Introductions');
    expect(introChannel.topic).toBe('This Channel Is For Company Wide Chatter');
  });
});
