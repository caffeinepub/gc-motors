import { MessageSquare, Send, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { Review } from "../backend.d";
import { useActor } from "../hooks/useActor";

function timeAgo(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const STAR_INDICES = [1, 2, 3, 4, 5];

function StarRating({
  rating,
  interactive = false,
  onRate,
  hovered,
  onHover,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
  hovered?: number;
  onHover?: (r: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {STAR_INDICES.map((val) => {
        const filled = interactive ? (hovered ?? rating) >= val : rating >= val;
        return (
          <button
            key={val}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRate?.(val)}
            onMouseEnter={() => interactive && onHover?.(val)}
            onMouseLeave={() => interactive && onHover?.(0)}
            className={`transition-all duration-150 ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                filled ? "fill-gold text-gold" : "fill-transparent text-gold/30"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function ReviewsSection() {
  const { actor, isFetching } = useActor();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const fetchReviews = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const data = await actor.getReviews();
      setReviews(
        [...data].sort((a, b) => Number(b.timestamp) - Number(a.timestamp)),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) fetchReviews();
  }, [actor, isFetching, fetchReviews]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!reviewText.trim()) {
      setError("Please write a review.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await actor.submitReview(name.trim(), BigInt(rating), reviewText.trim());
      setSuccess(true);
      setName("");
      setRating(0);
      setReviewText("");
      await fetchReviews();
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="reviews"
      className="py-24 px-6 relative overflow-hidden"
      data-ocid="reviews.section"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.12_0.01_45/0.3)] to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-gold mb-3 uppercase">
            What Drivers Say
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-foreground">
            PLAYER <span className="text-gold text-glow-gold">REVIEWS</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Submit Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="border border-gold/20 bg-card rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-5 h-5 text-gold" />
                <h3 className="font-display text-lg font-bold tracking-widest text-foreground uppercase">
                  Write a Review
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="review-name"
                    className="font-body text-xs tracking-widest text-muted-foreground uppercase mb-2 block"
                  >
                    Your Name
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-background border border-gold/20 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    data-ocid="reviews.input"
                  />
                </div>

                <div>
                  <p className="font-body text-xs tracking-widest text-muted-foreground uppercase mb-2">
                    Rating
                  </p>
                  <StarRating
                    rating={rating}
                    interactive
                    hovered={hovered}
                    onRate={setRating}
                    onHover={setHovered}
                  />
                </div>

                <div>
                  <label
                    htmlFor="review-text"
                    className="font-body text-xs tracking-widest text-muted-foreground uppercase mb-2 block"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="review-text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with GC Motors..."
                    rows={4}
                    className="w-full bg-background border border-gold/20 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                    data-ocid="reviews.textarea"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-body text-xs text-red-400"
                      data-ocid="reviews.error_state"
                    >
                      {error}
                    </motion.p>
                  )}
                  {success && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-body text-xs text-green-400"
                      data-ocid="reviews.success_state"
                    >
                      ✓ Review submitted successfully!
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-display text-sm font-bold tracking-widest px-6 py-3 rounded-full bg-gold text-background hover:shadow-gold-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  data-ocid="reviews.submit_button"
                >
                  {submitting ? (
                    <span className="animate-pulse">SUBMITTING...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      SUBMIT REVIEW
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4 max-h-[560px] overflow-y-auto pr-1"
          >
            {loading || isFetching ? (
              <div
                className="flex flex-col gap-4"
                data-ocid="reviews.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gold/10 bg-card rounded-xl p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gold/10 rounded w-1/3 mb-3" />
                    <div className="h-3 bg-gold/10 rounded w-1/2 mb-4" />
                    <div className="h-3 bg-gold/10 rounded w-full mb-2" />
                    <div className="h-3 bg-gold/10 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div
                className="border border-gold/10 bg-card rounded-xl p-10 text-center"
                data-ocid="reviews.empty_state"
              >
                <Star className="w-10 h-10 text-gold/30 mx-auto mb-3" />
                <p className="font-display text-sm tracking-widest text-muted-foreground uppercase">
                  No reviews yet
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Be the first to share your experience!
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {reviews.map((review, idx) => (
                  <motion.div
                    key={String(review.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className="border border-gold/15 bg-card rounded-xl p-6 relative overflow-hidden group hover:border-gold/30 transition-colors"
                    data-ocid={`reviews.item.${idx + 1}`}
                  >
                    <div className="absolute top-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-gold via-gold/60 to-transparent transition-all duration-500" />

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="font-display text-sm font-bold tracking-wide text-foreground uppercase">
                          {review.author}
                        </p>
                        <StarRating rating={Number(review.rating)} />
                      </div>
                      <span className="font-body text-xs text-muted-foreground whitespace-nowrap">
                        {timeAgo(review.timestamp)}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
