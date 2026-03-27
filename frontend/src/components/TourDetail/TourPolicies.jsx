import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ShieldCheck, Info, ChevronDown, ChevronUp } from 'lucide-react';

const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick, colorClass = "brand-orange" }) => {
  return (
    <div className="border border-black/10 rounded-[2rem] overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-black/[0.02] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl bg-${colorClass}/10 text-${colorClass}`}>
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-display font-bold text-brand-brown">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-brand-brown/40" /> : <ChevronDown className="text-brand-brown/40" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            layout
          >
            <div className="p-6 pt-0 border-t border-black/5 bg-black/[0.01]">
              <div className="text-brand-brown/80 leading-relaxed font-medium">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TourPolicies({ tour, openAccordion, toggleAccordion }) {
  return (
    <section className="space-y-4">
      <AccordionItem 
        title="What's Included" 
        icon={CheckCircle} 
        isOpen={openAccordion === 'included'} 
        onClick={() => toggleAccordion('included')}
        colorClass="green-600"
      >
        <ul className="space-y-3">
          {tour.included.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-brand-brown font-bold">
              <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem 
        title="Not Included" 
        icon={XCircle} 
        isOpen={openAccordion === 'notIncluded'} 
        onClick={() => toggleAccordion('notIncluded')}
        colorClass="red-600"
      >
        <ul className="space-y-3">
          {tour.notIncluded.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-brand-brown font-bold">
              <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem 
        title="Tour Policy" 
        icon={ShieldCheck} 
        isOpen={openAccordion === 'policy'} 
        onClick={() => toggleAccordion('policy')}
      >
        <ul className="space-y-4">
          {tour.policy.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-brand-brown font-bold">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange text-xs shrink-0">{i + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem 
        title="Important Notes" 
        icon={Info} 
        isOpen={openAccordion === 'notes'} 
        onClick={() => toggleAccordion('notes')}
      >
        <ul className="space-y-4">
          {tour.notes.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-brand-brown font-bold">
              <div className="w-2 h-2 rounded-full bg-brand-yellow mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </AccordionItem>
    </section>
  );
}
