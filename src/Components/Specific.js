

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Specific = () => {
  const { id, category } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/${category}/${id}?ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
        );
        setItem(response.data.data.results[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [id, category]);

  useEffect(() => {
    if (item && category === "characters" && item.comics) {
      const fetchRelatedItems = async () => {
        try {
          const response = await axios.get(
            item.comics.collectionURI +
              `?ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
          );
          setRelatedItems(response.data.data.results);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRelatedItems();
    } else if (item && category === "comics" && item.characters) {
      const fetchRelatedItems = async () => {
        try {
          const response = await axios.get(
            item.characters.collectionURI +
              `?ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
          );
          setRelatedItems(response.data.data.results);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRelatedItems();
    } else if (item && category === "creators" && item.comics) {
      const fetchRelatedItems = async () => {
        try {
          const response = await axios.get(
            item.comics.collectionURI +
              `?ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
          );
          setRelatedItems(response.data.data.results);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRelatedItems();
    } else if (item && category === "events") {
      const fetchRelatedItems = async () => {
        try {
          const characterResponse = await axios.get(
            item.characters.collectionURI +
              `?ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
          );
          const comicResponse = await axios.get(
            item.comics.collectionURI +
              `?ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
          );
          const creatorResponse = await axios.get(
            item.creators.collectionURI +
              `?ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
          );
          setRelatedItems({
            characters: characterResponse.data.data.results,
            comics: comicResponse.data.data.results,
            creators: creatorResponse.data.data.results,
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchRelatedItems();
    } else if (item && category === "stories" && item.comics) {
      const fetchRelatedItems = async () => {
        try {
          const response = await axios.get(
            item.comics.collectionURI +
              `?ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
          );
          setRelatedItems(response.data.data.results);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRelatedItems();
    }
  }, [item, category]);

  

  const renderCategoryData = () => {
    if (!item) return null;

    switch (category) {
      case "characters":
        return (
          <>
            <div className="box-content">
              <div className="right-box">
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
              </div>
              <div className="left-box">
                <h1>{item.name}</h1>
                <h4>{item.description}</h4>
              </div>
            </div>
            <div className="related-stuff">
              <h2>Related Comics:</h2>
              <div className="related">
                {relatedItems &&
                  relatedItems.map((comic) => (
                    <div key={comic.id} className="card">
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt=""
                      />
                      <p>{comic.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        );
      case "comics":
        return (
          <>
            <div className="box-content">
              <div className="right-box">
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
              </div>
              <div className="left-box">
                <h1>{item.title}</h1>
                <h4>{item.description}</h4>
              </div>
            </div>

            <div className="related-stuff">
              <h2>Related Characters:</h2>
              <div className="related">
                {relatedItems &&
                  relatedItems.map((character) => (
                    <div key={character.id} className="card">
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt=""
                      />
                      <p>{character.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        );
      case "creators":
        return (
          <>
            <div className="box-content">
              <div className="right-box">
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
              </div>
              <div className="left-box">
                <h1>{item.fullName}</h1>
                <p>Comics: {item.comics ? item.comics.available : 0}</p>
                <p>Stories: {item.stories ? item.stories.available : 0}</p>
                <p>Events: {item.events ? item.events.available : 0}</p>
              </div>
            </div>

            <div className="related-stuff">
              <h2>Related Comics:</h2>
              <div className="related">
                {relatedItems &&
                  relatedItems.map((comic) => (
                    <div key={comic.id} className="card">
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt=""
                      />
                      <p>{comic.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        );
      case "events":
        return (
          <>
            <div className="box-content">
              <div className="right-box">
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
              </div>
              <div className="left-box">
                <h1>{item.title}</h1>
                <h4>{item.description}</h4>
                <p>Creators: {item.creators ? item.creators.available : 0}</p>
                <p>Stories: {item.stories ? item.stories.available : 0}</p>
                <p>
                  Characters: {item.characters ? item.characters.available : 0}
                </p>
                <p>Comics: {item.comics ? item.comics.available : 0}</p>
                <p>Series: {item.series ? item.series.available : 0}</p>
              </div>
            </div>

            <div className="related-stuff">
              <div className="related-flex">
              <h2>Related Characters:</h2>
              <div className="related">
                {relatedItems &&
                  relatedItems.characters.map((character) => (
                    <div key={character.id} className="card">
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt=""
                      />
                      <p>{character.name}</p>
                    </div>
                  ))}
              </div>
              <h2>Related Comics:</h2>
              <div className="related">
                {relatedItems &&
                  relatedItems.comics.map((comic) => (
                    <div key={comic.id} className="card">
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt=""
                      />
                      <p>{comic.title}</p>
                    </div>
                  ))}
              </div>
              <h2>Related Creators:</h2>
              <div className="related">
                {relatedItems &&
                  relatedItems.creators.map((creator) => (
                    <div key={creator.id} className="card">
                      <img
                        src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
                        alt=""
                      />
                      <p>{creator.fullName}</p>
                    </div>
                  ))}
              </div>
              </div>
           
            </div>
          </>
        );
      case "stories":
        return (
          <>
            <div className="box-content">
              <div className="right-box">
                <h1>{item.title}</h1>
                <h4>{item.description}</h4>
                <p>Creators: {item.creators ? item.creators.available : 0}</p>
                <p>Stories: {item.stories ? item.stories.available : 0}</p>
                <p>
                  Characters: {item.characters ? item.characters.available : 0}
                </p>
                <p>Comics: {item.comics ? item.comics.available : 0}</p>
                <p>Series: {item.series ? item.series.available : 0}</p>
              </div>
            </div>

            <div className="related-stuff">
              <h2>Related Comics:</h2>
              <div className="related">
                {relatedItems &&
                  relatedItems.map((comic) => (
                    <div key={comic.id} className="card">
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt=""
                      />
                      <p>{comic.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderCategoryData()}</>;
};
