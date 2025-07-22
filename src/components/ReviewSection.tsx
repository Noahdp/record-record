import { Box, VStack, HStack, Text, Divider, Badge } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { CommunityReview } from "@/types/CommunityReview";
import { formatReviewDate } from "@/utils/dateUtils";
import { getRatingColor, getStarConfiguration } from "@/utils/ratingUtils";

interface ReviewSectionProps {
  reviews: CommunityReview[];
  communityRating?: {
    average: number;
    count: number;
  };
}

export const ReviewSection = ({
  reviews,
  communityRating,
}: ReviewSectionProps) => {
  const renderStars = (rating: number) => {
    const starConfig = getStarConfiguration(rating);

    return (
      <HStack spacing={1}>
        {starConfig.map((starType, index) => (
          <FaStar
            key={index}
            size={16}
            color={
              starType === "filled"
                ? getRatingColor(rating)
                : starType === "half"
                ? getRatingColor(rating)
                : "#E2E8F0"
            }
          />
        ))}
      </HStack>
    );
  };

  return (
    <VStack align="start" spacing={4} w="full" overflow="hidden">
      <Text fontWeight="semibold">Reviews:</Text>

      {/* Community Rating Section */}
      {communityRating && communityRating.count > 0 && (
        <Box
          p={4}
          bg="gray.50"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
          w="full"
        >
          <VStack align="start" spacing={2}>
            <Text fontWeight="semibold" color="gray.700">
              Community Rating
            </Text>
            <HStack spacing={3}>
              {renderStars(Math.round(communityRating.average))}
              <Badge colorScheme="blue" variant="solid">
                {communityRating.average.toFixed(1)}/5
              </Badge>
              <Text fontSize="sm" color="gray.600">
                ({communityRating.count}{" "}
                {communityRating.count === 1 ? "rating" : "ratings"})
              </Text>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Individual Reviews Section */}
      {!reviews || reviews.length === 0 ? (
        <Text color="gray.500" fontSize="sm">
          No individual reviews available yet.
        </Text>
      ) : (
        <Box w="full" overflow="hidden">
          <Text fontWeight="semibold" fontSize="sm" color="gray.600" mb={3}>
            Individual Reviews ({reviews.length}):
          </Text>

          <Box
            maxH="300px"
            overflowY="auto"
            bg="white"
            rounded="lg"
            p={4}
            shadow="md"
            border="1px solid"
            borderColor="gray.200"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <VStack align="start" spacing={4} w="full">
              {reviews.map((review, index) => (
                <Box key={review.id} w="full">
                  <VStack align="start" spacing={2}>
                    {/* Review Header */}
                    <HStack w="full" justify="space-between" align="center">
                      <HStack spacing={3}>
                        <Text fontWeight="bold" fontSize="sm">
                          {review.user}
                        </Text>
                        {review.rating > 0 && (
                          <>
                            {renderStars(review.rating)}
                            <Badge colorScheme="blue" variant="subtle">
                              {review.rating}/5
                            </Badge>
                          </>
                        )}
                      </HStack>
                      <Text fontSize="xs" color="gray.500">
                        {formatReviewDate(review.date)}
                      </Text>
                    </HStack>

                    {/* Review Comment */}
                    <Text fontSize="sm" lineHeight="tall">
                      {review.comment}
                    </Text>
                  </VStack>

                  {/* Divider between reviews (except for the last one) */}
                  {index < reviews.length - 1 && <Divider mt={4} />}
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      )}
    </VStack>
  );
};
