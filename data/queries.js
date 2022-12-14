// Construct our "home" and "error" page GROQ
export const homeID = `*[_type=="generalSettings"][0].home->_id`
export const shopID = `*[_type=="generalSettings"][0].shop->_id`
export const errorID = `*[_type=="generalSettings"][0].error->_id`

// Construct our "page" GROQ
const page = `
  "type": _type,
  "slug": slug.current,
  "isHome": _id == ${homeID},
  "isShop": _id == ${shopID}
`

// Construct our "link" GROQ
const link = `
  _key,
  _type,
  title,
  url,
  "page": page->{
    ${page}
  }
`

// Construct our "image meta" GROQ
export const imageMeta = `
  "alt": coalesce(alt, asset->altText),
  asset,
  crop,
  customRatio,
  hotspot,
  "id": asset->assetId,
  "type": asset->mimeType,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "lqip": asset->metadata.lqip
`

// Construct our "portable text content" GROQ
export const ptContent = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{
        ${page}
      }
    }
  },
  _type == "photo" => {
    ${imageMeta}
  }
`

// Construct our "product" GROQ
export const product = `
  {
    "publishDate": coalesce(publishDate, _createdAt),
    "slug": slug.current,
    "id": productID,
    title,
    price,
    comparePrice,
    description[]{
      ${ptContent}
    },
    "photos": {
      "main": galleryPhotos[]{
        forOption,
        photos[]{
          ${imageMeta}
        }
      },
      "listing": listingPhotos[]{
        forOption,
        "default": listingPhoto{
          ${imageMeta}
        },
        "hover": listingPhotoHover{
          ${imageMeta}
        }
      },
    },
    inStock,
    lowStock,
    useGallery,
    surfaceOption,
    options[]{
      name,
      position,
      values[]
    },
    optionSettings[]{
      forOption,
      "color": color->color,
    },
    "variants": *[_type == "productVariant" && productID == ^.productID && wasDeleted != true && isDraft != true]{
      "id": variantID,
      title,
      price,
      comparePrice,
      inStock,
      lowStock,
      options[]{
        name,
        position,
        value
      },
      seo
    },
    "klaviyoAccountID": *[_type == "generalSettings"][0].klaviyoAccountID,
    "filters": filters[]{
      "slug": filter->slug.current,
      forOption
    }
  }
`

// Construct our "blocks" GROQ
export const blocks = `
  _type == 'freeform' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    textAlign,
    maxWidth
  },
  _type == 'accordions' => {
    _type,
    _key,
    items[]{
      "id": _key,
      title,
      content[]{
        ${ptContent}
      }
    }
  }
`

// Construct our content "modules" GROQ
export const modules = `
  _type == 'grid' => {
    _type,
    _key,
    size,
    columns[]{
      sizes[]{
        breakpoint,
        width,
        justify,
        align,
        start
      },
      blocks[]{
        ${blocks}
      }
    }
  },
  _type == 'hero' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    bgType,
    photos{
      ...,
      mobilePhoto{
        ${imageMeta}
      },
      desktopPhoto{
        ${imageMeta}
      }
    },
    video{
      id,
      title
    }
  },
  _type == 'marquee' => {
    _type,
    _key,
    items[]{
      _type == 'simple' => {
        _type,
        text
      },
      _type == 'photo' => {
        _type,
        "photo": {
          ${imageMeta}
        }
      }
    },
    speed,
    reverse,
    pausable
  },
  _type == 'dividerPhoto' => {
    _type,
    _key,
    photo{
      ${imageMeta}
    }
  }
`

// Construct our "site" GROQ
export const site = `
  "site": {
    "title": *[_type == "generalSettings"][0].siteTitle,
    "rootDomain": *[_type == "generalSettings"][0].siteURL,
    "shop": *[_type == "shopSettings"][0]{
      storeURL,
      cartMessage
    },
    "productCounts": [ {"slug": "all", "count": count(*[_type == "product"])} ] + *[_type == "collection"]{
      "slug": slug.current,
      "count": count(products)
    },
    "aboutPopup": *[_type == "aboutSettings"][0]{
      enabled,
      message
    },
    "header": *[_type == "headerSettings"][0]{
      "promo": *[_type == "promoSettings"][0]{
        enabled,
        display,
        text,
        "link": link->{
          ${page}
        }
      },
      menuDesktopLeft->{
        items[]{
          ${link},
          dropdownItems[]{
            ${link}
          },
          featured[]->${product}
        }
      },
      menuDesktopRight->{
        items[]{
          ${link},
          dropdownItems[]{
            ${link}
          },
          featured[]->${product}
        }
      },
      menuMobilePrimary->{
        items[]{
          ${link},
          dropdownItems[]{
            ${link}
          },
        }
      },
      menuMobileSecondary->{
        items[]{
          ${link},
          dropdownItems[]{
            ${link}
          },
        }
      }
    },
    "footer": *[_type == "footerSettings"][0]{
      "blocks": [
        {
          "title": blockTitle1,
          newsletter{
            "id": "footer",
            klaviyoListID,
            submit,
            successMsg[]{
              ${ptContent}
            },
            errorMsg[]{
              ${ptContent}
            },
            terms[]{
              ${ptContent}
            }
          }
        },
        {
          "title": blockTitle2,
          "menu": blockMenu2->{
            items[]{
              ${link}
            }
          }
        },
        {
          "title": blockTitle4,
          social[]{
            _type == 'socialLink' => {
              _type,
              icon,
              url,
            },
            _type == 'navPage' => {
              ${link}
            }
          }
        }
      ]
    },
    "seo": *[_type == "seoSettings"][0]{
      metaTitle,
      metaDesc,
      shareTitle,
      shareDesc,
      shareGraphic,
      "favicon": favicon.asset->url,
      "faviconLegacy": faviconLegacy.asset->url,
      touchIcon
    },
    "gtmID": *[_type == "generalSettings"][0].gtmID,
  }
`

// All Products
export const allProducts = `
  *[_type == "product" && wasDeleted != true && isDraft != true]${product} | order(title asc)
`
