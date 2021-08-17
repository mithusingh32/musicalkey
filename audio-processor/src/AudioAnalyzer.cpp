#include <iostream>
#include <sstream>
#include <chrono>
#include <thread>


#include "AudioAnalyzer.h"

#include "Superpowered.h"
#include "SuperpoweredAnalyzer.h"
#include "SuperpoweredDecoder.h"
#include "SuperpoweredSimple.h"

namespace AudioAnalyzer
{
    AudioAnalyzer::AudioAnalyzer(Napi::Function &callback, std::string inNewFile)
        : AsyncWorker(callback), mError(false), mFileLocation(inNewFile), returnString(""), mTitle(""), mArtist(""), mAlbum(""), mLength(""), mCamelotWheelKey(""), mChordNames("")
    {
        Superpowered::Initialize(
            "ExampleLicenseKey-WillExpire-OnNextUpdate",
            true,  // enableAudioAnalysis (using SuperpoweredAnalyzer, SuperpoweredLiveAnalyzer, SuperpoweredWaveform or SuperpoweredBandpassFilterbank)
            false, // enableFFTAndFrequencyDomain (using SuperpoweredFrequencyDomain, SuperpoweredFFTComplex, SuperpoweredFFTReal or SuperpoweredPolarFFT)
            false, // enableAudioTimeStretching (using SuperpoweredTimeStretching)
            false, // enableAudioEffects (using any SuperpoweredFX class)
            true,  // enableAudioPlayerAndDecoder (using SuperpoweredAdvancedAudioPlayer or SuperpoweredDecoder)
            false, // enableCryptographics (using Superpowered::RSAPublicKey, Superpowered::RSAPrivateKey, Superpowered::hasher or Superpowered::AES)
            false  // enableNetworking (using Superpowered::httpRequest)
        );
    };

    // Do the stuff here
    void AudioAnalyzer::Execute()
    {
        Superpowered::Decoder *decoder = new Superpowered::Decoder();

        // Parse all ID3 Frames to get ID3 information
        if (decoder->open(mFileLocation.c_str()) != Superpowered::Decoder::OpenSuccess)
        {
            mError = true;
        }
        else
        {
            decoder->parseAllID3Frames(true, 10000);

            // Get the file location, title, artist, album, and duration of audio file
            std::string aTitle = (decoder->getTitle() == NULL) ? "N/A" : decoder->getTitle();
            std::string aArtist = (decoder->getArtist() == NULL) ? "N/A" : decoder->getArtist();
            std::string aAlbum = (decoder->getAlbum() == NULL) ? "N/A" : decoder->getAlbum();
            double AudioDurationSec = decoder->getDurationSeconds();

            mTitle = aTitle;
            mArtist = aArtist;
            mAlbum = aAlbum;
            mLength = std::to_string(AudioDurationSec);

            std::stringstream ss;
            ss << "File Location: " << mFileLocation << "\n"
               << "Title: " << aTitle << "\n"
               << "Artist: " << aArtist << "\n"
               << "Album: " << aAlbum << "\n"
               << "Length: " << AudioDurationSec << "\n";

            // Create the analyzer.
            Superpowered::Analyzer *analyzer = new Superpowered::Analyzer(decoder->getSamplerate(), (int)decoder->getDurationSeconds());

            // Create a buffer for the 16-bit integer audio output of the decoder.
            short int *intBuffer = (short int *)malloc(decoder->getFramesPerChunk() * 2 * sizeof(short int) + 16384);
            // Create a buffer for the 32-bit floating point audio required by the effect.
            float *floatBuffer = (float *)malloc(decoder->getFramesPerChunk() * 2 * sizeof(float) + 16384);

            // Processing audio file
            while (true)
            {
                int framesDecoded = decoder->decodeAudio(intBuffer, decoder->getFramesPerChunk());
                if (framesDecoded < 1)
                    break;

                // Submit the decoded audio to the analyzer.
                Superpowered::ShortIntToFloat(intBuffer, floatBuffer, framesDecoded);
                analyzer->process(floatBuffer, framesDecoded);
            };

            analyzer->makeResults(60, 200, 0, 0, false, false, true, false, true);

            // Create Key string with Camelot Wheel Notation and Chord Name
            std::stringstream aKey;

            mCamelotWheelKey = Superpowered::camelotChordNames[analyzer->keyIndex];
            mChordNames = Superpowered::musicalChordNames[analyzer->keyIndex];
            returnString = ss.str();
        }
    };
    // Return the stuff here
    void AudioAnalyzer::OnOK()
    {
        Napi::HandleScope scope(Napi::Env());
        obj = Napi::Object::New(Env());

        if (mError)
        {
            obj.Set("error", mError);
            obj.Set("ErrorMessage", "Can't parse audio");
        }
        else
        {
            obj.Set("location", mFileLocation);
            obj.Set("title", mTitle);
            obj.Set("artist", mArtist);
            obj.Set("album", mAlbum);
            obj.Set("length", mLength);
            obj.Set("camelotWheelKey", mCamelotWheelKey);
            obj.Set("chordName", mChordNames);
        }

        Callback().Call({Env().Null(), obj});
    }

    void AudioAnalyzer::OnError(const Napi::Error &e)
    {
        // Napi::HandleScope scope(Napi::Env());
        // obj = Napi::Object::New(Env());
        // obj.Set("Error", true);
        // obj.Set("ErrorMessage", e);
    }
} // namespace AudioAnalyzer
