'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Button from '@/components/ui/Button'

export default function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams',
      price: { monthly: 0, annual: 0 },
      badge: 'Free Forever',
      badgeColor: 'bg-green-500',
      features: [
        '3 assessments per month',
        'Basic analytics dashboard',
        'Standard assessment modules',
        'Email support',
        'Community access'
      ],
      limitations: [
        'Limited to 3 assessments/month',
        'Basic reporting only',
        'No custom scenarios'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Professional',
      description: 'For growing teams and startups',
      price: { monthly: 49, annual: 39 },
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
      features: [
        'Unlimited assessments',
        'Advanced analytics & insights',
        'All assessment modules',
        'Custom scenario builder',
        'Priority email support',
        'Team collaboration tools',
        'Performance predictions',
        'Export capabilities'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Team',
      description: 'For established companies',
      price: { monthly: 99, annual: 79 },
      badge: 'Best Value',
      badgeColor: 'bg-purple-500',
      features: [
        'Everything in Professional',
        'Advanced team management',
        'Custom branding',
        'API access',
        'SSO integration',
        'Dedicated account manager',
        'Advanced reporting',
        'Bulk candidate management',
        'White-label options'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: { monthly: 'Custom', annual: 'Custom' },
      badge: 'Contact Sales',
      badgeColor: 'bg-gray-500',
      features: [
        'Everything in Team',
        'Custom integrations',
        'On-premise deployment',
        'Advanced security & compliance',
        'Custom assessment development',
        '24/7 phone support',
        'Training & onboarding',
        'SLA guarantees',
        'Custom contracts'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'Start with a 14-day free trial of our Professional plan. No credit card required. You can cancel anytime during the trial period.'
    },
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees for any plan. You only pay the monthly or annual subscription fee. Enterprise plans may include optional professional services.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, we\'ll refund your payment in full.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="pricing" ref={ref} className="py-20 bg-gradient-to-b from-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6"
          >
            <span className="mr-2">💰</span>
            Simple, Transparent Pricing
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core assessment platform 
            with different levels of features and support.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center">
            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${billingCycle === 'annual' ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 ${
                plan.popular 
                  ? 'border-blue-500/50 ring-2 ring-blue-500/20 scale-105' 
                  : 'border-gray-700 hover:border-gray-600'
              } transition-all duration-300`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 ${plan.badgeColor} text-white text-xs font-semibold rounded-full`}>
                  {plan.badge}
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  {typeof plan.price[billingCycle] === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-white">
                        ${plan.price[billingCycle]}
                      </span>
                      <span className="text-gray-400 ml-1">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                      {billingCycle === 'annual' && plan.price.monthly > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          ${Math.round(plan.price.annual * 12 / 12)} per month
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {plan.price[billingCycle]}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-green-400 mr-2 mt-0.5">✓</span>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="text-xs text-gray-500 mb-2">Limitations:</div>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start">
                          <span className="text-gray-500 mr-2 mt-0.5">•</span>
                          <span className="text-gray-500 text-xs">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Button
                variant={plan.popular ? "primary" : "outline"}
                size="lg"
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    : ''
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
              >
                <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Schedule a Demo
              </Button>
              <Button variant="glass" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
