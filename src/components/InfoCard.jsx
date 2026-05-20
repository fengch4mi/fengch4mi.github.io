import { motion } from 'framer-motion';

function InfoCard({ title, className, children, ...motionProps }) {
  return (
    <motion.div className={className} {...motionProps}>
      <h3>{title}</h3>
      {children}
    </motion.div>
  );
}

export default InfoCard;
