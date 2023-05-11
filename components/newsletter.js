import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { m, AnimatePresence } from 'framer-motion'
import cx from 'classnames'
import { useInView } from 'react-cool-inview'

import { fadeAnim } from '@lib/animate'

import BlockContent from '@components/block-content'
import Icon from '@components/icon'

const Newsletter = ({ data = {}, buttonClassname }) => {
  // Extract our module data
  const {
    id = 'newsletter',
    mailchimpAudienceID = 'd428795118',
    terms,
    submit,
    newsletterMsg,
    successMsg,
    errorMsg,
  } = data

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const { observe, inView } = useInView({
    unobserveOnEnter: true,
  })

  const hasAgreed = watch('acceptTerms')

  // Call to reset the form
  const resetForm = (e) => {
    e.preventDefault()
    reset()
    setError(false)
    setSuccess(false)
    setSubmitting(false)
  }

  // handle form submission
  const onSubmit = (data, e) => {
    e.preventDefault()

    // set an error if there's no Mailchimp audience supplied...
    if (!mailchimpAudienceID) setError(true)

    // ...and bail out if terms active and not agreed to (or just Mailchimp audience is missing)
    if ((!hasAgreed && terms && !mailchimpAudienceID) || !mailchimpAudienceID)
      return

    setSubmitting(true)
    setError(false)

    fetch('/api/mailchimp/newsletter-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audienceID: mailchimpAudienceID,
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmitting(false)
        setSuccess(true)
      })
      .catch((error) => {
        setSubmitting(false)
        setError(true)
        console.log(error)
      })
  }

  const email = register('email', {
    required: 'This field is required.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Invalid email address.',
    },
  })

  return (
    <form ref={observe} className="form" onSubmit={handleSubmit(onSubmit)}>
      <AnimatePresence mode="wait">
        {!error && !success && (
          <m.div
            key="form"
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
            className="form--fields"
          >
            <input
              type="text"
              name="fullname"
              autoComplete="off"
              className="control--pot"
              aria-hidden="true"
              {...register('fullname')}
            />
            <div className="control--group is-inline is-clean">
              <div className={`control${errors?.email ? ' has-error' : ''}`}>
                <label htmlFor={`email-${id}`} className="control--label">
                  Email Address
                </label>
                <input
                  id={`email-${id}`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  ref={email.ref}
                  onFocus={(e) => {
                    e.target.parentNode.classList.add('is-filled')
                  }}
                  onBlur={(e) => {
                    const value = e.target.value
                    email.onBlur(e)
                    e.target.parentNode.classList.toggle('is-filled', value)
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                    email.onChange(e)
                    e.target.parentNode.classList.toggle('is-filled', value)
                  }}
                />

                {errors?.email && (
                  <span role="alert" className="control--error">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="control--submit-group">
              <button
                type="submit"
                className={cx(
                  'btn',
                  {
                    'is-loading': submitting,
                    'is-disabled': terms && !hasAgreed,
                  },
                  buttonClassname
                )}
                disabled={submitting || (terms && !hasAgreed)}
              >
                {submit ? submit : 'Subscribe'}
              </button>
              {newsletterMsg && (
                <NewsletterMessage message={newsletterMsg} active={inView} />
              )}
            </div>
          </m.div>
        )}

        {success && (
          <m.div
            key="success"
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
            className="form--success"
          >
            <div className="form--success-content">
              {successMsg ? (
                <BlockContent className="is-small-body" blocks={successMsg} />
              ) : (
                <p>Subscribed</p>
              )}
            </div>
          </m.div>
        )}

        {error && (
          <m.div
            key="error"
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
            className="form--error"
          >
            <div className="form--error-content">
              {errorMsg ? (
                <BlockContent className="is-small-body" blocks={errorMsg} />
              ) : (
                <p>Error!</p>
              )}
              <p className="form--error-reset">
                <button className="btn" onClick={(e) => resetForm(e)}>
                  try again
                </button>
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </form>
  )
}

const NewsletterMessage = ({ message, active }) => {
  const variants = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 1,
        ease: 'linear',
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'linear',
      },
    },
  }
  return (
    <AnimatePresence>
      {active && (
        <m.div
          key="subscribe-message"
          variants={variants}
          initial="hide"
          animate="show"
          exit="hide"
          className="message"
        >
          <BlockContent className="is-small-body" blocks={message} />
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default Newsletter
