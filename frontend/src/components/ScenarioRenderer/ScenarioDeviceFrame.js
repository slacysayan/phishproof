import React from 'react';
import SMSBubble from './SMSBubble';
import UPIScreen from './UPIScreen';
import WhatsAppChat from './WhatsAppChat';
import CallTranscript from './CallTranscript';
import EmailViewer from './EmailViewer';
import FakeWebsite from './FakeWebsite';

export const ScenarioDeviceFrame = ({ type, content, highlight = false, targets = [] }) => {
  const render = () => {
    switch (type) {
      case 'sms': return <SMSBubble content={content} highlight={highlight} targets={targets} />;
      case 'upi': return <UPIScreen content={content} highlight={highlight} targets={targets} />;
      case 'whatsapp': return <WhatsAppChat content={content} highlight={highlight} targets={targets} />;
      case 'call': return <CallTranscript content={content} highlight={highlight} targets={targets} />;
      case 'email': return <EmailViewer content={content} highlight={highlight} targets={targets} />;
      case 'website': return <FakeWebsite content={content} highlight={highlight} targets={targets} />;
      default: return <div className="p-6 text-[#898989] text-center text-sm">Scenario loading...</div>;
    }
  };
  return (
    <div className="rounded-[28px] bg-[#1a1a1a] p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.35),0_0_0_1px_rgba(34,42,53,0.08)]" data-testid="scenario-device-frame">
      <div className="rounded-[22px] overflow-hidden bg-[#0B1020] border border-black/20">
        {render()}
      </div>
    </div>
  );
};

export default ScenarioDeviceFrame;
