import cv2
import numpy
from sklearn.cluster import KMeans
from typing import List
"""
    Sequence of steps for the following function:
    1. Take the image path and the number of colors to extract as input.
    2. Reads the image using cv2.imread.
    3. Converts the image from BGR (OpenCV's default) to RGB color space.
    4. Reshapes the image into a 2D array of pixels.
    5. Applies K-Means clustering to the pixel data to find num_colors clusters.
    6. Returns the cluster centers, which represent the dominant colors in the image.
"""


def extract_colors(image_path: str, num_colors: int) -> numpy.ndarray:
    """
    This function extracts num_colors amount of colors from an image with a given path.

    :param image_path: The path to the image.
    :param num_colors: The number of dominant colors to extract.
    :return: An array of size num_colors, containing the red green and blue values of the dominate colors.
    """

    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    image_width = image.shape[0]
    image_height = image.shape[1]

    image = image.reshape((image_width * image_height, 3))

    kmeans = KMeans(n_clusters=num_colors)
    kmeans.fit(image)

    return kmeans.cluster_centers_
